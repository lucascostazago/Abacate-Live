async function pixAbacate(value: number, name: string) {
    const options = {
        method: 'POST',
        headers: {Authorization: 'Bearer abc_dev_nbTNjt1hgLYZGdFFtdfhpAS0', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          amount: value,
          expiresIn: 200,
          description: name,
        })
      };
      
      try {
        const response = await fetch('https://api.abacatepay.com/v1/pixQrCode/create', options);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
        throw err;
      }
}

export { pixAbacate };