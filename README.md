# General Parser

## Introduction

This project should allow to easily create parsers via an web ui. The main goal is to make it easy creating an parser for complex data input (text from trading cards) while providing an tree structure for further processing. There will be an option to request data to parse from another service and mark areas with a certain token. The application will then create patterns to look for, thus it should be able to parse other input as well. While returning an tree.

## How to run

To run the general parser you need some setup first.

1. Download the latest NodeJS release [here](https://nodejs.org/). (Older versions may work as well)
2. Download MongoDB [here](https://www.mongodb.com/)
3. Rename `.env.example` to `.env` and fill all configuration
4. Run `npm i --save`
5. Run `npm run start`

Now you are good to go and can access the general parser via your browser.

## What is comming next?

This project is worked on in my free time. Thereby new features can take a while until they are implemented. Nontheless I want to add certain feature. (The scope may be changing at any time)

- Requesting data from another service
  - Sort into "parsable" and "non-parsable" to later add the missing token patterns
- Multiple parsing methods
  - Dynamic parsing by examples
  - Static parsing by predetermined rules
- Multiple user/project support
  - Allow multiple users to have multiple parsing projects to which they can interact
- A web UI from which you can work with your projects
- Project export
  - Export type definitions for the returned tree (.ts.d)
  - Export an standalone parser that can be used offline

## Contributing

If there is an feature you want to see. Create an issue where we can discuss if this feature should be added to the repository. If you are able to programm yourself feel free to create a PR with your feature (at least an working PoC).

For more details see [CONTRIBUTING.md](CONTRIBUTING.md)