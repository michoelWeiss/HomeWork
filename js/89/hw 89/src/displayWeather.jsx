import './displayWeather.css'
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