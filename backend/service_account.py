import os

PATH = os.path.join(os.path.dirname(__file__), 'service-accounts', 'status-report.json')

def set_env(): 
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = PATH


if __name__=='__main__':
    set_env()
    