# Crypto to Fiat Conversion Display React Module

## Introduction 🎩

This is a web app that allows users to convert amounts between currencies.
This app currently only supports conversions between CRYPTO <=> FIAT.

## Description 📝

This web app allows users to visualize how much a currency is worth relative to another.
Unlike typical apps, this one also allows a user to see the different rates between exchanges.
A user can easily convert currencies in either directions using the simple and intuitive UI.

The logic for this application is seperated between the client and API.
The API handles getting the rates from the different exchanges and parsing the data.
Then it will pass the data to the client where (using utility classes to format the values) it will display the relevent data to the user.

This application was built while prioritizing the ability for anyone to run this on their local machine. Therefore, there isn't a lot of common logic which should be abstracted into its own NPM package nor API keys needed to fetch data from each exchange. The only common logic used was abstracted into their own interfaces and shared between the client and API.

### Learning Experience 📚

This project gave me a chance to work with new technolgies including:

- [Next API](https://nextjs.org/docs/api-routes/introduction/)
- [Chakra UI](https://chakra-ui.com/docs/components/button/usage#social-buttons/)
- [React Transitions](https://github.com/reactjs/react-transition-group/tree/master)

## Getting Started 🏁

### Requirements ✅

- [Node.js](https://nodejs.dev/)

### Installation (Mac) 💾

1. Download [Node.js](https://nodejs.dev/)
2. Download this repository on your local machine
3. Open up the client directory in your terminal
4. Download all npm packages using `npm run clean`

- This will install a clean node_modules directory and create a production build

5. Once its done, run `npm run dev` and open up http://localhost:3000
6. In another terminal, run `npm run dev:stripe-webhook`

### Notes 🖍

#### Testing 📝

To run tests, run `npm run test:prod` in the client directory in your terminal.
This will run all tests in the application.

## Features 🧩

This app has the following functionalities:

- View amounts from base to desired currencies
- View exchange rates for selected currencies
- View amounts and exchange rates from multiple different exchanges
- View conversion data for many different fiat and crypto currencies

## Roadmap 🗺

This app's funcitonality is pretty basic as of right now but there is still room for growth. The biggest thing that users could want is a recommendation feature which recommends the best exchange rate from several differnt exchanges. This could also be further developed to buy crypto/fiat currencies from the exchange with the best rates which would highly benefit the user or users who make many transactions.

## Edge Cases ⚠️

Although this app is pretty robust (validated through integration tests), there are still a few corners which I cut to make it work.

### Faults in External APIs 🚩

For one, this application relies on external APIs for several exchanges. If one of their endpoints/servers goes down, this application will also be unable to function.

This could be mitigated by providing many more sources but because this is a proof of concept, extra sources were not implemented.

### Appropriate Error Handling 🚩

Another shortcoming of this application is the lack of descriptive error handlers. This application did not focus on creating a robust error handling system and uses generic messages and broad statuses.

If this were to be scaled, appropriate error handling classes should be implemented with more descriptive messages and error statuses to describe to the user the issues at hand. This would also serve for a better development experience as the devs will have an easier time investigating and exploring issues within the application.

### Notes 🖍

This is by no means an exhaustive list but only a few of the more critical points.
