const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;

form.addEventListener('submit',(e)=>{

    e.preventDefault(); 
    if(upd){
        clearTimeout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);
});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    // console.log(r);
    // console.log(r.data.coin.price);
    const price = r.data.coin.price;
    const rnk = r.data.coin.rank;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const mcap = r.data.coin.marketCap;
    const base = r.data.coin.name;
    const target = 'INR';

    res.innerHTML = `<tr style = "color:#eec614">
    <td class = "bg-secondary bg-gradient"><b>Property</b></td>
    <td class = "bg-secondary bg-gradient"><b>Value</b></td>
    </tr>
    <tr style = "color:#eec614">
        <td>${base}</td>
        <td>${price} ${target}</td>
    </tr>
    <tr style = "color:#eec614">
        <td>Rank</td>
        <td>${rnk}</td>
    </tr> 
    <tr style = "color:#eec614">
        <td>Volume</td>
        <td>${volume}</td>
    </tr>
    <tr style = "color:#eec614">
        <td>Change</td>
        <td>${change}%</td>
    </tr>
    <tr style = "color:#eec614">
        <td>Market Cap</td>
        <td>${mcap}</td>
    </tr>`;

    upd = setTimeout(()=>fetchPrice(ctype), 10000);
}