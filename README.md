# spellhold
Pricing website for Spellhold Games.  The standard pricing website, TCGPlayer, can often be slow and unwieldy so I decided to create my own pricing source to speed up customer interactions regarding card buying and selling for myself and my business partners.

The current iteration has two pages, index.html, which contains only the search bar, and resultsPage.html, which also contains the search bar but displays the results of the search as well.

Quick rundown of the js files:
- autocomplete.js provides the logic behind the autocompletion and creation of the menu of matching Magic card names in addition to persisting the searched card name on click of submit.  I disallowed submitting the form unless the form's contents match a card in the autocomplete array.
- getCardData.js feeds the submission from the search bar into a GET from the Scryfall API which gets the card data and creates an object with all relevant data
- printCardData.js then loops through the resulting json file, extracting and displaying all card data created from getCardData.js.
- openCardTab.js handles the card tab opening and closing on click.

On the dev branch, the cart system is coming together, the UI needs some heavy improvements and the functionality isn't all there yet, so I haven't merged it to master.

You can see it in action at http://maxsutton.dev/

### TODO
1. Add cart system to allow users to add cards to the cart with a custom quantity and price and denotate whether buying the card from a customer or selling to them
2. Add CSS, Spellhold branding, and tweak the UI for a better user experience
3. Cache card data from Scryfall API in SQL database and create HTTP requests to that database to obfuscate Scryfall API
4. React refactor and automated testing just to practice both
