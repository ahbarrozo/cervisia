/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import useSWR from 'swr';
import useForm from '../lib/useForm';
import fetcher from '../lib/fetcher';

export default function EditBrewery({ obdb_id }) {
  /* calling the API. If an inexistent or void obdb_id is provided,
     nothing will be rendered */
  const { data, error } = useSWR(`/api/brewery/${obdb_id}`, fetcher);

  // TODO: ERROR IN CASE OF INVALID OBDBID
  //       CHECK USER AUTHENTICATION

  const { brewery } = data;

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    brewery,
  });
  const choices = [
    'Wifi',
    'Open Late',
    'Family Friendly',
    'Vegan',
    'LGBT Friendly',
  ];
  // const tags = inputs.tags || [];

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  console.log(inputs);
  return (
    <form method="POST" className="card" encType="multipart/form-data">
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          id="description"
          name="description"
          placeholder="Tell us about this brewery"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="photo">
        Photo
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/gif, image/png, image/bmp, image/jpg"
          onChange={handleChange}
        />
        {/* inputs.photo ? <img src=inputs.photo alt=inputs.name width=200 /> */}
      </label>

      <label htmlFor="address">
        Address
        <div id="geocoder__container" />
        <input
          type="text"
          id="address"
          name="location[address]"
          value={inputs.location && inputs.location.address}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="longitude">
        Longitude
        <input
          type="text"
          id="address"
          name="location[coordinates][0]"
          value={inputs.location && inputs.location.coordinates[0]}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="latitude">
        Latitude
        <input
          type="text"
          id="address"
          name="location[coordinates][1]"
          value={inputs.location && inputs.location.coordinates[1]}
          onChange={handleChange}
        />
      </label>
      <ul className="tags">
        {choices.map((choice) => (
          <div className="tag tag__choice">
            <input
              type="checkbox"
              id={choice}
              value={choice}
              name="tags"
              checked={inputs?.brewery.tags.includes(choice)}
              onChange={handleChange}
            />
            <label htmlFor={choice}>{choice}</label>
          </div>
        ))}
      </ul>

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}

EditBrewery.propTypes = {
  obdb_id: PropTypes.string,
};
