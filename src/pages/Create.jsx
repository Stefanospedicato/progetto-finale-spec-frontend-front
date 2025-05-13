import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const logoLinks = [
  "https://www.svgrepo.com/show/342292/tesla.svg",
  "https://www.svgrepo.com/show/305809/bmw.svg",
  "https://images.seeklogo.com/logo-png/27/2/ford-logo-png_seeklogo-271868.png",
  "https://cdn.freebiesupply.com/logos/large/2x/volkswagen-1-logo-png-transparent.png",
  "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
  "https://www.svgrepo.com/show/446899/mercedes-benz.svg",
  "https://www.svgrepo.com/show/446911/porsche.svg",
  "https://www.svgrepo.com/show/306317/lamborghini.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Toyota_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Toyota_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Volvo-Iron-Mark-Black.svg/1024px-Volvo-Iron-Mark-Black.svg.png",
  "https://upload.wikimedia.org/wikipedia/it/thumb/f/fe/Peugeot_2021.svg/1200px-Peugeot_2021.svg.png",
  "https://www.svgrepo.com/show/446899/mercedes-benz.svg",
  "https://upload.wikimedia.org/wikipedia/it/0/04/Logo_della_Ferrari_S.p.A..svg",
  "https://www.svgrepo.com/show/446890/lexus.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png",
  "https://www.svgrepo.com/show/306214/hyundai.svg",
  "https://www.svgrepo.com/show/446903/mitsubishi.svg",
];

const scuderie = [
  "Tesla",
  "BMW",
  "Ford",
  "Volkswagen",
  "Audi",
  "Mercedes-Benz",
  "Porsche",
  "Lamborghini",
  "Nissan",
  "Toyota",
  "Toyota",
  "Volvo",
  "Peugeot",
  "Mercedes-Benz",
  "Ferrari",
  "Lexus",
  "Honda",
  "Hyundai",
  "Mitsubishi"
];

const initialFormData = {
  title: '',
  category: '',
  releaseYear: 0,
  brand: '',
  doors: 0,
  price: 0,
  fuelType: [],
  nationality: '',
  model: '',
  horsepower: 0,
  topSpeed: 0,
  trasmissione: '',
  video: '',
  logo: '',
  description: '',
  image: ''
};

const Create = () => {

  const [formData, setFormData] = useState(initialFormData);
  const { createCar, cars } = useGlobalContext();
  const navigate = useNavigate();

  const categories = [];
  cars.forEach(car => {
    if (!categories.includes(car.category)) {
      categories.push(car.category);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'fuelType' ? value.split(', ') : value,
      logo: name === 'logo' ? logoLinks[e.target.selectedIndex - 1] : prevData.logo,
      image: name === 'image' && value.trim() !== '' ? e.target.value : 'https://upullit.com.au/wp-content/uploads/placeholder-car.png'
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedData = {
      ...formData,
      releaseYear: parseInt(formData.releaseYear),
      price: parseFloat(formData.price),
      doors: parseInt(formData.doors),
      horsepower: parseInt(formData.horsepower),
      topSpeed: parseInt(formData.topSpeed),
    };
    if (!isValid(transformedData)) {
      alert('Compilare tutti i campi');
      return;
    }
    createCar(transformedData);
    console.log('Dati inviati:', transformedData);
    alert('Automobile aggiunta con successo');
    navigate('/cars');
  };

  const isValid = (formData) => {
    const { title, category, releaseYear, brand, doors, fuelType, nationality, model, trasmissione, logo } = formData;
    return (
      title.trim() !== '' && title.length >= 3 &&
      brand.trim() !== '' &&
      model.trim() !== '' &&
      category !== 'default' &&
      releaseYear > 1900 &&
      brand.trim() !== '' &&
      doors > 0 &&
      fuelType.length > 0 && fuelType[0] !== 'default' &&
      nationality.trim() !== '' &&
      model.trim() !== '' &&
      trasmissione !== 'default'
    );

  }

  return (
    <div className='container my-5'>
      <h1 className='text-center'>AGGIUNGI UNA NUOVA AUTOMOBILE</h1>
      <form onSubmit={handleSubmit}>
        <label className='w-100'>
          <span>Titolo:</span>
          <input type="text" placeholder="es: Fiat 500, Volkswagen T-ROC, Alfa Romeo Tonale..." className='form-control w-100' onChange={handleChange} name='title' />
          {formData.title === '' && <span className='error-message'>Il campo non può essere vuoto</span>}
        </label>
        <label className='w-100'>
          <span>Scuderia:</span>
          <input type="text" placeholder="es: Citroen, Pagani, McLaren..." className='form-control w-100' onChange={handleChange} name='brand' />
          {formData.brand === '' && <span className='error-message'>Il campo non può essere vuoto</span>}
        </label>
        <label className='w-100'>
          <span>Modello:</span>
          <input type="text" placeholder="es: A5, CLA, Giulia, Model X..." className='form-control w-100' onChange={handleChange} name='model' />
          {formData.model === '' && <span className='error-message'>Il campo non può essere vuoto</span>}
        </label>
        <label className='w-100'>
          <span>Nazionalità scuderia:</span>
          <input type="text" placeholder="es: Germania, Italia, Francia, USA..." className='form-control w-100' onChange={handleChange} name='nationality' />
          {formData.nationality === '' && <span className='error-message'>Il campo non può essere vuoto</span>}
        </label>
        <label className='w-100'>
          <span>Categoria:</span>
          <select className='form-control w-100' onChange={handleChange} name='category'>
            <option value="default">Seleziona una categoria...</option>
            <option value="Coupet">Coupet</option>
            <option value="Cabriolet">Cabriolet</option>
            {categories.map((category, index) => <option key={index}>{category}</option>)}
            <option value="D'Epoca">D'Epoca</option>
            <option value="Crossover">Crossover</option>
          </select>
          {formData.category === 'default' && <span className='text-danger'>Selezionare una categoria valida</span>}
        </label>
        <label className='w-100'>
          <span>Anno di uscita:</span>
          <input type="number" min={1900} max={new Date().getFullYear()} className='form-control w-100' onChange={handleChange} name='releaseYear' />
        </label>
        <label className='w-100'>
          <span>A partire da euro:</span>
          <input type="number" min={0} className='form-control w-100' onChange={handleChange} name='price' />
        </label>
        <label className='w-100'>
          <span>Descrizione:</span>
          <textarea type="text" placeholder="Inserisci una descrizione..." className='form-control w-100' onChange={handleChange} name='description' />
        </label>
        <h3 className="text-center my-3">CARATTERISTICHE TECNICHE</h3>
        <label className='w-100'>
          <span>Carburante:</span>
          <select name="fuelType" defaultValue="default" onChange={handleChange} className='form-control w-100'>
            <option value="default" disabled>Scegli un tipo di carburante...</option>
            <option value="Benzina">Benzina</option>
            <option value="Diesel">Diesel</option>
            <option value="GPL">GPL</option>
            <option value="Metano">Metano</option>
            <option value="Plug-In Hybrid">Plug-In Hybrid</option>
            <option value="Benzina, Elettrico">Benzina, Elettrico</option>
            <option value="Diesel, Elettrico">Diesel, Elettrico</option>
            <option value="Benzina, GPL">Benzina, GPL</option>
          </select>
          {formData.fuelType.length === 0 || formData.fuelType[0] === 'default' && <span className='error-message'>Selezionare un tipo di carburante valido</span>}
        </label>
        <label className='w-100'>
          <span>Cambio:</span>
          <select className='form-control w-100' defaultValue='default' onChange={handleChange} name='trasmissione'>
            <option value="default" disabled>Seleziona un cambio...</option>
            <option value="Manuale">Manuale</option>
            <option value="Automatico">Automatico</option>
          </select>
          {formData.trasmissione === 'default' && <span className='error-message'>Selezionare un cambio valido</span>}
        </label>
        <label className='w-100'>
          <span>Numero di porte:</span>
          <input type="number" min={1} max={7} className='form-control w-100' onChange={handleChange} name='doors' />
        </label>
        <label className='w-100'>
          <span>Potenza in CV:</span>
          <input type="number" min={0} className='form-control w-100' onChange={handleChange} name='horsepower' />
        </label>
        <label className='w-100'>
          <span>Velocità massima in km/h:</span>
          <input type="number" min={0} className='form-control w-100' onChange={handleChange} name='topSpeed' />
        </label>
        <h3 className="text-center my-3">CARICA LE IMMAGINI</h3>
        <label className='w-100'>
          <span>Logo scuderia (link):</span>
          <select name="logo" onChange={handleChange} defaultValue='default' className='form-control w-100'>
            <option value="default" disabled>Scegli un logo...</option>
            {scuderie.map((logo, index) => <option key={index}>{logo}</option>)}
          </select>
        </label>
        <label className='w-100'>
          <span>Immagine automobile (link, facoltativo):</span>
          <input type="text" className='form-control w-100' onChange={handleChange} name='image' />
        </label>
        <button type="submit" className="btn btn-info w-100 mt-3">Aggiungi nuova automobile</button>
      </form>
    </div>
  );
};

export default Create;
