require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Testa se fetch foi chamada, quando utilizado fetchItem', () => {
    fetchItem('MLB1615760527')

    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';

    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testa se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');

    expect(response).toEqual(item);
  });
  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro.', async () => {
    const failRequest = await fetchItem();

    expect(failRequest).toEqual(new Error('You must provide an url'));
  });
});
