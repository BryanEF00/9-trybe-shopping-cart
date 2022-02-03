const fetchItem = async (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;

  try {
    const result = await fetch(url);
    const data = await result.json();

    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
