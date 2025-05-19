import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const scuderie = [
  { brand: "Abarth", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Abarth_Logo.svg/2560px-Abarth_Logo.svg.png" },
  { brand: "Alfa Romeo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Alfa_Romeo_logo.svg/2560px-Alfa_Romeo_logo.svg.png" },
  { brand: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png" },
  { brand: "Bentley", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Bentley_logo.svg/2560px-Bentley_logo.svg.png" },
  { brand: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW_logo_%28gray%29.svg/2560px-BMW_logo_%28gray%29.svg.png" },
  { brand: "Citroen", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Citroen_2022.svg" },
  { brand: "Dacia", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Dacia-Logo-2021.svg" },
  { brand: "Ferrari", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Ferrari_logo.svg/2560px-Ferrari_logo.svg.png" },
  { brand: "Fiat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/FIAT_logo_%282020%29.svg/2560px-FIAT_logo_%282020%29.svg.png" },
  { brand: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hyundai_logo.svg/2560px-Hyundai_logo.svg.png" },
  { brand: "Jaguar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jaguar_logo.svg/2560px-Jaguar_logo.svg.png" },
  { brand: "Jeep", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Jeep_logo.svg/2560px-Jeep_logo.svg.png" },
  { brand: "Lamborghini", logo: "https://www.svgrepo.com/show/306317/lamborghini.svg" },
  { brand: "Lancia", logo: "https://my.eurococ.eu/files/logo/lancia-logo.svg" },
  { brand: "Land Rover", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Land_Rover_logo.svg/2560px-Land_Rover_logo.svg.png" },
  { brand: "Maserati", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Maserati_logo.svg/2560px-Maserati_logo.svg.png" },
  { brand: "Mercedes-Benz", logo: "https://www.svgrepo.com/show/446899/mercedes-benz.svg" },
  { brand: "Mini", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Mini_logo.svg/2560px-Mini_logo.svg.png" },
  { brand: "Nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nissan_logo.svg/2560px-Nissan_logo.svg.png" },
  { brand: "Opel", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Opel-Logo_2017.svg" },
  { brand: "Peugeot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Peugeot_2021.svg/2560px-Peugeot_2021.svg.png" },
  { brand: "Porsche", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Porsche_logo.svg/2560px-Porsche_logo.svg.png" },
  { brand: "Renault", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Text.svg" },
  { brand: "Smart", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Smart.svg/2560px-Smart.svg.png" },
  { brand: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Tesla_logo.svg/2560px-Tesla_logo.svg.png" },
  { brand: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Toyota-logo.svg/2560px-Toyota-logo.svg.png" },
  { brand: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Volkswagen.svg/2560px-Volkswagen.svg.png" },
  { brand: "Volvo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Volvo-logo.svg/2560px-Volvo-logo.svg.png" },
]

const fuels = ["Benzina", "Diesel", "Elettrico", "GPL", "Metano", "Plug-In Hybrid", "Benzina, Elettrico", "Diesel, Elettrico", "Benzina, GPL"]

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
  const { createCar, cars, apiUrl } = useGlobalContext();
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
      logo: name === 'logo' ? scuderie[e.target.selectedIndex - 1].logo : prevData.logo,
      image: name === 'image' && value.trim() !== '' ? e.target.value : 'https://upullit.com.au/wp-content/uploads/placeholder-car.png'
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedData = {
      ...formData,
      releaseYear: parseInt(formData.releaseYear),
      price: parseInt(formData.price),
      doors: parseInt(formData.doors),
      horsepower: parseInt(formData.horsepower),
      topSpeed: parseInt(formData.topSpeed),
    };
    if (!isValid(transformedData)) {
      alert('Compilare tutti i campi');
      return;
    }
    createCar(transformedData);
    alert('Automobile aggiunta con successo!');
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
          <span>Titolo: {formData.title === '' && <span className='error-message'>Il campo non può essere vuoto!</span>}{formData.title !== '' && <span className='error-message text-success'>✔</span>}</span>
          <input type="text" placeholder="es: Fiat 500, Volkswagen T-ROC, Alfa Romeo Tonale..." className='form-control w-100' onChange={handleChange} name='title' />
        </label>
        <label className='w-100'>
          <span>Scuderia: {formData.brand === '' && <span className='error-message'>Il campo non può essere vuoto!</span>}{formData.brand !== '' && <span className='error-message text-success'>✔</span>}</span>
          <input type="text" placeholder="es: Citroen, Pagani, McLaren..." className='form-control w-100' onChange={handleChange} name='brand' />
        </label>
        <label className='w-100'>
          <span>Modello: {formData.model === '' && <span className='error-message'>Il campo non può essere vuoto!</span>}{formData.model !== '' && <span className='error-message text-success'>✔</span>}</span>
          <input type="text" placeholder="es: A5, CLA, Giulia, Model X..." className='form-control w-100' onChange={handleChange} name='model' />
        </label>
        <label className='w-100'>
          <span>Nazionalità scuderia: {formData.nationality === '' && <span className='error-message'>Il campo non può essere vuoto!</span>}{formData.nationality !== '' && <span className='error-message text-success'>✔</span>}</span>
          <input type="text" placeholder="es: Germania, Italia, Francia, USA..." className='form-control w-100' onChange={handleChange} name='nationality' />
        </label>
        <label className='w-100'>
          <span>Categoria: {formData.category === 'default' && <span className='error-message'>Seleziona una categoria valida!</span>}{formData.category !== 'default' && <span className='error-message text-success'>✔</span>}</span>
          <select className='form-control w-100' onChange={handleChange} name='category'>
            <option value="default">Seleziona una categoria...</option>
            <option value="Coupet">Coupet</option>
            <option value="Cabriolet">Cabriolet</option>
            {categories.map((category, index) => <option key={index}>{category}</option>)}
            <option value="D'Epoca">D'Epoca</option>
            <option value="Crossover">Crossover</option>
          </select>
        </label>
        <label className='w-100'>
          <span>Anno di uscita:
            {formData.releaseYear < 1900 || formData.releaseYear > new Date().getFullYear() ? (
              <span className='error-message'>Digitare un anno compreso tra 1900 e il {new Date().getFullYear()}</span>
            ) : formData.releaseYear >= 1900 && (
              <span className='error-message text-success'>✔</span>
            )}
          </span>
          <input type="number" min={1900} max={new Date().getFullYear()} className='form-control w-100' onChange={handleChange} name='releaseYear' />
        </label>
        <label className='w-100'>
          <span>A partire da euro: {formData.price < 1 && <span className='error-message'>Il prezzo non può essere zero</span>}{formData.price > 0 && <span className='error-message text-success'>✔</span>}</span>
          <input type="number" min={0} className='form-control w-100' onChange={handleChange} name='price' />
        </label>
        <label className='w-100'>
          <span>Descrizione:{formData.description !== '' && <span className='error-message text-success'>✔</span>}</span>
          <textarea type="text" placeholder="Inserisci una descrizione..." className='form-control w-100' onChange={handleChange} name='description' />
        </label>
        <h3 className="text-center my-3">CARATTERISTICHE TECNICHE</h3>
        <label className='w-100'>
          <span>Carburante: {formData.fuelType !== '' && <span className='error-message text-success'>✔</span>}</span>
          <select name="fuelType" defaultValue="Benzina" onChange={handleChange} className='form-control w-100'>
            {fuels.map((fuel, index) => (
              <option key={index} value={fuel}>{fuel}</option>
            ))}
          </select>
        </label>
        <label className='w-100'>
          <span>Cambio: {formData.trasmissione !== '' && <span className='error-message text-success'>✔</span>}</span>
          <select className='form-control w-100' defaultValue='default' onChange={handleChange} name='trasmissione'>
            <option value="Automatico">Automatico</option>
            <option value="Manuale">Manuale</option>
          </select>
        </label>
        <label className='w-100'>
          <span>Numero di porte: {formData.doors > 0 && <span className='error-message text-success'>✔</span>}</span>
          <input type="number" min={1} max={7} className='form-control w-100' onChange={handleChange} name='doors' />
        </label>
        <label className='w-100'>
          <span>Potenza in CV: {formData.horsepower > 0 && <span className='error-message text-success'>✔</span>}</span>
          <input type="number" min={0} className='form-control w-100' onChange={handleChange} name='horsepower' />
        </label>
        <label className='w-100'>
          <span>Velocità massima in km/h: {formData.topSpeed > 0 && <span className='error-message text-success'>✔</span>}</span>
          <input type="number" min={0} className='form-control w-100' onChange={handleChange} name='topSpeed' />
        </label>
        <h3 className="text-center my-3">CARICA LE IMMAGINI</h3>
        <label className='w-100'>
          <span>Logo scuderia (link):</span>
          <select name="logo" onChange={handleChange} defaultValue='default' className='form-control w-100'>
            <option value="default" disabled>Scegli un logo...</option>
            {scuderie.map((scuderia, i) => <option key={i}>{scuderia.brand}</option>)}
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

