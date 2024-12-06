import './displayWeather.css'
import PropTypes from 'prop-types';
export function DisplayWeather(props) {

        const { location, image, temp, desc, success } = props;
        return (
                <>
                        {success === true ? (
                                <>
                                        <div>The weather in {location} is:</div>
                                        <img src={image} alt="Weather Icon" />
                                        <div>
                                                {temp} °F and {desc}
                                        </div>
                                </>
                        ) : (
                                <div>Please Pick A Valid ZipCode</div>)
                        }
                </>
        )

}
DisplayWeather.propTypes = {
        location: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        temp: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
        success: PropTypes.bool.isRequired,
      };