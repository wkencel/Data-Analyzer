
# Data Analyzer - Powered by Chat-gpt
#
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wkencel/ChatGPT.DataAnalyzer)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This Data Analyzer is an open-source online resource that helps individuals analyze their data through the LLM Chat-gpt so that they can get data driven insights to help inform them of what business actions to take. Feel free to send me any pull requests to contribute to it's functionality.

**Feel free to see what else I'm up to [here](http://willkencelhome2023.s3-website-us-east-1.amazonaws.com/)!**

## Table of Contents

- [How to use Data Analyzer](#how-to-use-data-analyzer)
- [Set Up](#set-up)
- [Technologies](#technologies)
- [My SWE pillars](#my-swe-pillars)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## How to use Data Analyzer?
After a brief set up, Data Analyzer will allow you to host a powerful data analysis tool right on your desktop! Just upload your CSV file and Chat-gpt will automatically analyze it. Then you're free to ask it any questions about your data. This tool assists with data-driven insights to make informed decisions but always support your conclusions with further research and study.

## Set Up
1. clone this repo

2. run ```npm i``` to install the necessary dependencies

3. create a .env file and put in your Chat-gpt API Key as such

   ``` VITE_OPENAI_API_KEY= Your API_KEY here``` 

4. run ```npm run dev``` to start clientside

5. navigate to ```./server/```

6. run ```uvicorn main:app --reload``` to start server

## Technologies
This app runs on [Chat-GPT](https://openai.com/chatgpt) and is built in the [React](https://react.dev/) Framework with Hooks. It uses the [tsparticles](https://github.com/tsparticles/react) library for the interactive background. It also uses [Vite](https://vitejs.dev/) for it's local development server. A library called [papaparse](https://github.com/mholt/PapaParse) is used for parsing the csv files.



## My SWE pillars

### Conventions make the difference
Learn to write clean code, use conventions and version control to catch mistakes easily, make your work future-proof, and allow others to quickly review it.

### Automate your project
Learn to automate your research workflow. Don't waste time manually running every step. Let your computer take care of it for you, while you can work on something else and don't just wait behind a screen.

### Scale it up if you need more power
When the going gets tough, the tough get cloud computing. Learn to quickly resume your work running instances on remote servers.

## Meta-Information
*   Maintainer: Will Kencel(`@willkencel`)

## Contributing

I welcome contributions of all kinds:
new prs for additional content,
fixes to the existing code,
bug reports,
and reviews of proposed changes are all welcome.

## Questions
Feel free to reach out to me at [wkencel1@gmail.com](mailto:wkencel1@gmail.com).

## License

Text and materials are licensed under a Creative Commons CC-BY-NC-SA license. The license allows you to copy, remix and redistribute any of my publicly available materials, under the condition that you attribute the work (details in the license) and do not make profits from it.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.