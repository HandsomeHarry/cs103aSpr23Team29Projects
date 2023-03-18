'''
gptwebapp shows how to create a web app which ask the user for a prompt
and then sends it to openai's GPT API to get a response. You can use this
as your own GPT interface and not have to go through openai's web pages.

We assume that the APIKEY has been put into the shell environment.
Run this server as follows:

On Mac
% pip3 install openai
% pip3 install flask
% export APIKEY="......."  # in bash
% python3 gptwebapp.py

On Windows:
% pip install openai
% pip install flask
% $env:APIKEY="....." # in powershell
% python gptwebapp.py
'''
from flask import request,redirect,url_for,Flask
from gpt import GPT
import os

app = Flask(__name__)
gptAPI = GPT(os.environ.get('APIKEY'))

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q789789uioujkkljkl...8z\n\xec]/'

@app.route('/')
def index():
    ''' display a link to the general query page '''
    print('processing / route')
    return f'''
        <h1>Group 29 GPT demo</h1>
        <a href="{url_for('gptdemo')}">Ask questions to GPT</a>
        <a href="{url_for('fieldAnalysis')}">Analyse field</a>
        <a href="{url_for('about')}">About</a>
        <a href="{url_for('team')}">Team</a>
        <a href="{url_for('index')}">Index page</a>
    '''


@app.route('/gptdemo', methods=['GET', 'POST'])
def gptdemo():
    ''' handle a get request by sending a form 
        and a post request by returning the GPT response
    '''
    if request.method == 'POST':
        prompt = request.form['prompt']
        answer = gptAPI.getResponse(prompt)
        return f'''
        <h1>GPT Demo</h1>
        <pre style="bgcolor:yellow">{prompt}</pre>
        <hr>
        Here is the answer in text mode:
        <div style="border:thin solid black">{answer}</div>
        Here is the answer in "pre" mode:
        <pre style="border:thin solid black">{answer}</pre>
        <a href={url_for('gptdemo')}> make another query</a>
        '''
    else:
        return '''
        <h1>Generate analysis of specific field</h1>
        Enter the field you want to analyse:
        <form method="post">
            <textarea name="prompt"></textarea>
            <p><input type=submit value="get response">
        </form>
        '''

@app.route('/convertCode', methods=['GET', 'POST'])
def convertCode():
    ''' handle a get request by sending a form 
        and a post request by returning the GPT response
    '''
    if request.method == 'POST':
        prompt = request.form['prompt']
        answer = gptAPI.getResponse(prompt)
        return f'''
        <h1>GPT Demo</h1>
        <pre style="bgcolor:yellow">{prompt}</pre>
        <hr>
        Here is the answer in "pre" mode:
        <pre style="border:thin solid black">{answer}</pre>
        <a href={url_for('gptdemo')}> make another query</a>
        '''
    else:
        return '''
        <h1>Generate analysis of specific field</h1>
        Enter the field you want to analyse:
        <form method="post">
            <textarea name="prompt"></textarea>
            <p><input type=submit value="get response">
        </form>
        '''

@app.route('/fieldAnalysis', methods=['GET', 'POST'])
def fieldAnalysis():
    ''' handle a get request by sending a form 
        and a post request by returning the GPT response
    '''
    if request.method == 'POST':
        prompt = request.form['prompt']
        answer = gptAPI.fieldAnalysis(prompt)
        return f'''
        <h1>GPT Demo</h1>
        <pre style="bgcolor:yellow">{prompt}</pre>
        <hr>
        Here is the answer in text mode:
        <div style="border:thin solid black">{answer}</div>
        Here is the answer in "pre" mode:
        <pre style="border:thin solid black">{answer}</pre>
        <a href={url_for('gptdemo')}> make another query</a>
        '''
    else:
        return '''
        <h1>Generate analysis of specific field</h1>
        Enter the field you want to analyse:
        <form method="post">
            <textarea name="prompt"></textarea>
            <p><input type=submit value="get response">
        </form>
        '''
    
@app.route('/about')
def about():
    print('processing / route')
    return f'''
        <h1>About</h1>
        <p>This is a GPT demo</p>
        <a href="{url_for('index')}">Index page</a>
    '''

@app.route('/team')
def team():
    print('processing / route')
    return f'''
        <h1>Team</h1>
        <p>Group 29</p>
        <a href="{url_for('index')}">Index page</a>
    '''


if __name__=='__main__':
    # run the code on port 5001, MacOS uses port 5000 for its own service :(
    app.run(debug=True,port=5001)