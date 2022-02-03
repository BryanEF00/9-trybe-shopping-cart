const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se localStorage.setItem foi chamado', () => {
    saveCartItems('cartItems', '<ol><li>Item</li></ol>');

    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Testa se ao executar a função saveCartItems com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado corretamente', () => {
    const value = '<ol><li>Item</li></ol>';

    saveCartItems(value)

    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', value);
  });
});
