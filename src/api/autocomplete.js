export default class Autocomplete {
  cardNames = [];

  async fetchCardNames() {
    let response = await fetch("https://api.scryfall.com/catalog/card-names");
    let json = await response.json();
    this.cardNames = json.data;
    this.cardNames.forEach((elem, i, cardNames) => {
      cardNames[i] = {
        id: i,
        name: elem,
      };
    });
    return this.cardNames;
  }
}
