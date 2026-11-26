(() => {
  const search = document.getElementById('product-search');
  const select = document.getElementById('inventory-product');
  const status = document.getElementById('product-search-status');
  if (!search || !select || select.disabled) return;

  const products = Array.from(select.options).filter(option => option.value);
  document.getElementById('product-search-label').hidden = false;

  search.addEventListener('input', () => {
    const term = search.value.trim().toLocaleLowerCase();
    const selectedId = select.value;
    const matches = products.filter(option => option.dataset.search.toLocaleLowerCase().includes(term));
    select.replaceChildren(new Option(matches.length ? 'Select a product' : 'No matching products', ''), ...matches);
    // Keep an explicit selection only while it still matches the search.
    select.value = matches.some(option => option.value === selectedId) ? selectedId : '';
    status.hidden = matches.length > 0;
    status.textContent = matches.length ? '' : 'No products match. Try another name or barcode, or ask an administrator to add the product.';
  });
})();
