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
def main():
    ''' display a link to the general query page '''
    print('processing / route')
    return f'''
        <h1>Group 29 GPT demo</h1>
        <a href="{url_for('index')}">Index page</a>
        <br>
        <a href="{url_for('about')}">About</a>
        <br>
        <a href="{url_for('team')}">Team</a>
    '''


@app.route('/index')
def index():
    ''' display a link to the general query page '''
    print('processing / route')
    return f'''
        <h1>Group 29 GPT demo</h1>
        <a href="{url_for('fieldAnalysis')}">Analyse field</a>
        <br>
        <a href="{url_for('convertCode')}">Convert code</a>
        <br>
        <!--enter link to other pages here-->
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
        <h1>Convert Code to Python</h1>
        <pre style="bgcolor:yellow">{prompt}</pre>
        <hr>
        Here is the answer in "pre" mode:
        <pre style="border:thin solid black">{answer}</pre>
        <a href={url_for('gptdemo')}> make another query</a>
        '''
    else:
        return '''
        <h1>Convert the code into Python</h1>
        Enter the code you want to convert:
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
        <h1>Field analysis output</h1>
        <pre style="bgcolor:yellow">{prompt}</pre>
        <hr>
        <pre style="border:thin solid black; white-space: pre-wrap;">{answer}</pre>
        <a href={url_for('fieldAnalysis')}> make another query</a>
        <br>
        <a href="/">Main page</a>
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
        <p>This is a GPT demo.</p>
        <a href="/">Main page</a>
    '''

@app.route('/team')
def team():
    print('processing / route')
    return f'''
        <h1>Team</h1>
        <p>Group 29</p>
        <li>Harry Yu: Team leader, wrote <strong>fieldAnalysis</strong> function, built website framework</li>
        <li>Aaron Tang: Wrote <strong>convertCodetoPython</strong> function, built website framework</li>
        <li>Jake Liu</li>
        <li>Denise Zhong</li>
        <li>Nana Li</li>
        <br>
        <a href="/">Main page</a>
    '''


if __name__=='__main__':
    # run the code on port 5001, MacOS uses port 5000 for its own service :(
    app.run(debug=True,port=5001)