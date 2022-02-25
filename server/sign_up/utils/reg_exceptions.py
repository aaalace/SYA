class RepeatedPasswordException(Exception):
    def __str__(self):
        return 'Пароли различаются'
    
    def errcode(self):
        return [2, 3]

class SameUserExistsException(Exception):
    def __str__(self):
        return 'Такой пользователь уже существует'
    
    def errcode(self):
        return [1]
        
class SmallUsernameException(Exception):
    def __str__(self):
        return 'Короткое имя профиля'
    
    def errcode(self):
        return [1]

class SmallPasswordException(Exception):
    def __str__(self):
        return 'Короткий пароль'
    
    def errcode(self):
        return [2]

class NullNameException(Exception):
    def __str__(self):
        return 'Введите свое имя'
    
    def errcode(self):
        return [4]

class NullSurnameException(Exception):
    def __str__(self):
        return 'Введите свою фамилию'
    
    def errcode(self):
        return [5]

class NullBirthException(Exception):
    def __str__(self):
        return 'Введите свою дату рождения'
    
    def errcode(self):
        return [6]

class EmptyEmailException(Exception):
    def __str__(self):
        return 'Введите почту'
    
    def errcode(self):
        return [7]

class RegisteredEmailException(Exception):
    def __str__(self):
        return 'Пользователь с такой почтой уже зарегистрирован'
    
    def errcode(self):
        return [7]

class NoneEmailException(Exception):
    def __str__(self):
        return 'Несуществующая почта'
    
    def errcode(self):
        return [7]