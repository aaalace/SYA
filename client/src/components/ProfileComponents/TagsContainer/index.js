import React, { useState } from "react";
import { useSelector } from "react-redux"
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './style.css'

function TagsContainer(props) {
    const own_tags = useSelector(state => state.user.tags)
    const oth_tags = useSelector(state => state.opened_profile.tags)
    let tags = oth_tags
    if(props.owner){
        tags = own_tags
    }

    const [sliceValue, setSliceValue] = useState(5)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#0010FE', '#43C49F', '#FFFB28', '#FAC042', '#AFFEFF'];

    const tooltipStyle = {
        backgroundColor: '#ffff', 
        padding: '5px', 
        border: '1px solid #cccc', 
        borderRadius: '5px'
    }

    let pieData = []
    let valueList = []
    const startedLength = tags.length
    for(let new_tag of tags){
        let len = tags.filter(x => x === new_tag).length
        pieData.push({"name": new_tag, "value": len / startedLength * 100})
        valueList.push(new_tag)
        tags = tags.filter(value => !valueList.includes(value))
    }
    pieData.sort(function(a, b) {
        let keyA = new Date(a.value),
        keyB = new Date(b.value);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    pieData = pieData.filter(data => data.value !== 0)

    function changeSliceValue() {
        if(sliceValue > 5){
            setSliceValue(5)
        }
        else{
            setSliceValue(pieData.length)
        }
    }

    function CustomTooltip({ active, payload }) {
        if (active) {
            return (
                <div style={tooltipStyle}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };

    function CustomLegend() {
        return (
            <div className="legend_container">
                {pieData.slice(0, sliceValue).map(part => <p>{part.name.length > 10 ? part.name.slice(0, 10) + '...' : part.name}</p>)}
                {pieData.length > 5 ? <a onClick={changeSliceValue} style={{cursor: 'pointer', fontSize: '11px', color: '#AC80C1'}}>{sliceValue <= 5 ? 'others...' : 'hide'}</a> : null}
            </div>
        )
    };

    console.log(pieData)
    return (
        <div className="pie_container">
            <CustomLegend/>
            <PieChart width={120} height={150}>
                <Pie style={{transition: 'none'}} data={pieData} color="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} innerRadius={35}>
                    {
                        pieData.map((el, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </div>
    )
}

export default TagsContainer;