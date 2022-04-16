// UI
import { EnvironmentOutlined } from '@ant-design/icons';
import { Avatar, Descriptions, Typography } from 'antd';
// Utils
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

function Details({ result }) {
  const { city, country, time, main, humidity, tempMin, tempMax, description, icon } = result;

  return (
    <div className="details">
      <Title level={2} style={{ margin: 0 }}>
        {main}
        <Avatar size={80} src={icon} />
      </Title>
      <Text type="secondary">
        <EnvironmentOutlined />
        {` ${city}, ${country.toUpperCase()}`}
      </Text>
      <Descriptions>
        <Descriptions.Item label="Description">
          <Text>{description}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Temperature">
          <Text>{`${tempMin}°C ~ ${tempMax}°C`}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Humidity">
          <Text>{`${humidity}%`}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          <Text>{dayjs(time).format('YYYY-MM-DD hh:mm A')}</Text>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

// Prop types definition
Details.propTypes = {
  result: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};

export default Details;
