from validate_email import validate_email

def email_check(address):
    emailcheck = validate_email(address)
    return emailcheck