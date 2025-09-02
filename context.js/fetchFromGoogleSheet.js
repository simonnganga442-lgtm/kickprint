import Papa from 'papaparse';

const SHEET_URLS = {
  1: '/DATA%20-%20products.csv',
  2: '/DATA%20-%20category.csv',
  3: '/DATA%20-%20brand.csv',
  4: '/DATA%20-%20tag.csv',
};

export async function fetchSheetData(sheetNumber = 1) {
  const relativePath = SHEET_URLS[sheetNumber];
  if (!relativePath) {
    console.error('No URL configured for sheet number:', sheetNumber);
    return [];
  }

  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? `https://kickprints.netlify.app/` || 'http://localhost:3001'
    : '';
  const url = `${baseUrl}${relativePath}`;

  try {
    const response = await fetch(url);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (err) => {
          console.error('CSV parse error:', err);
          reject(err);
        },
      });
    });
  } catch (error) {
    console.error('Failed to fetch sheet data:', error);
    return [];
  }
}
