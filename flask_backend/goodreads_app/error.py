class Error(Exception):
    """Custom error class"""

    def __init__(self, message, status_code=400):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return {'message': self.message}