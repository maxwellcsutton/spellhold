# spellhold
Pricing website for Spellhold Games

The current iteration has two pages, index.html, the search bar, and resultsPage.html, which also contains the search bar but displays the results of the search as well.  Autocomplete.js provides the logic behind creating the autocomplete and menu of matching Magic card names in addition to persisting the searched card name on click of submit.  getCardData.js feeds the submission from the search bar into a call from the Scryfall API which gets the card data, then loops through the resulting json file extracting and displaying all relevant card data.

### TODO
1. Add cart system to allow users to add cards to the cart with a custom quantity and price and denotate whether buying the card from a customer or selling to them
2. Add CSS and tweak the UI for a better user experience
3. Cache Scryfall API in SQL database and create HTTP requests that database to obfuscate Scryfall API
4. React refactor and automated testing just to practice both
