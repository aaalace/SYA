import React from 'react';
import ReactHowler from 'react-howler/lib/ReactHowler';
import raf from 'raf'; // requestAnimationFrame polyfill
import './style.css'


export class FullControl extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      rate: 1,
      isSeeking: false,
      src: props.src,
      onLoadHadler: this.handleOnLoad,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this)
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this)
    this.handleSeekingChange = this.handleSeekingChange.bind(this)
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  convertSeconds (num) {
    return new Date(num * 1000).toISOString().substr(14, 5)
  }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration() || 0
    })
  }

  handleOnPlay () {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleLoopToggle () {
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    })
  }

  handleMouseDownSeek () {
    this.setState({
      isSeeking: true
    })
  }

  handleMouseUpSeek (e) {
    this.setState({
      isSeeking: false
    })

    this.player.seek(e.target.value)
  }

  handleSeekingChange (e) {
    this.setState({
      seek: parseFloat(e.target.value)
    })
  }

  renderSeekPos () {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek()
      })
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render () {
    return (
      <div style={{ borderRadius: '15px', 
            padding: '16px'
        }}>
        <ReactHowler
            src={[this.state.src]}
            playing={this.state.playing}
            onLoad={this.handleOnLoad}
            onPlay={this.handleOnPlay}
            onEnd={this.handleOnEnd}
            loop={this.state.loop}
            mute={this.state.mute}
            volume={this.state.volume}
            ref={(ref) => (this.player = ref)}
        />
        {/* <h5 style={{position: 'absolute'}}>{(this.state.loaded) ? null : 'Loading...'}</h5> */}

        <div className='toggles'>
            <label>
                <i className="fa-solid fa-repeat audio-icon-player" style={{
                    color: this.state.loop ? '#43314b' : '#AC80C1'
                }}/>
                <input 
                  type='checkbox' 
                  checked={this.state.loop} 
                  onChange={this.handleLoopToggle} 
                  style={{display: 'none'}}
                />
            </label>
            <label>
              {this.state.mute ? 
                <i className="fa-solid fa-volume-xmark audio-icon-player"/>
                : <i className="fa-solid fa-volume-high audio-icon-player"/>
              }
              <input type='checkbox' checked={this.state.mute} 
                onChange={this.handleMuteToggle} style={{
                  display: 'none'
              }}/>
            </label>
            <label className='phone-seek-play'>
              {this.state.playing ?
                <i className="fa-solid fa-pause audio-icon-player" onClick={this.handleToggle}/> 
                : <i className="fa-solid fa-play audio-icon-player" onClick={this.handleToggle}/> 
              }
            </label>
            <div className='volume'>
                <input value={this.state.volume}
                    className="volume-range"
                    min="0" max="1" step='.01' id="range" type="range"
                    oninput="rangenumber.value=value"
                    onChange={e => this.setState({ volume: parseFloat(e.target.value) })}
                />
                <p className='volume-value'>
                    {(this.state.volume * 100).toFixed()}
                </p>
            </div>
        </div>
        <div className='volume-phone'>
          <input value={this.state.volume}
            className="volume-range " style={{display: 'block'}}
            min="0" max="1" step='.01' id="range" type="range"
            oninput="rangenumber.value=value"
            onChange={e => this.setState({ volume: parseFloat(e.target.value) })}
          />
          <p className='volume-value'>
            {(this.state.volume * 100).toFixed()}
          </p>
        </div>
         <div className='seek'>
          <label className='seek-label'>
            <div className='seek-div'>
              {this.state.playing ?
                <i className="fa-solid fa-pause audio-icon-player" onClick={this.handleToggle}/> 
                : <i className="fa-solid fa-play audio-icon-player" onClick={this.handleToggle}/> 
              }
              <p className='seek-start'>
                {this.convertSeconds(this.state.seek.toFixed())}
              </p>
            </div>
            <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <input min="0" step='.01' id="range" type="range"
                oninput="rangenumber.value=value"
                style={{marginRight: '8px', width: '100%'}} 
                max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                value={this.state.seek}
                onChange={this.handleSeekingChange}
                onMouseDown={this.handleMouseDownSeek}
                onMouseUp={this.handleMouseUpSeek}
              />
              <p className='seek-end'>
                {(this.state.duration) ? this.convertSeconds(this.state.duration.toFixed()) : '00:00'}
              </p>
            </div>
          </label>
        </div>
      </div>
    )
  }
}