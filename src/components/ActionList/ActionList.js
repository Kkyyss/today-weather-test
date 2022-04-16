// UI, icons
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
// Utils
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

function ActionList(props) {
  const { dataSource, loading, searchCallback, deleteCallback } = props;
  return (
    <div className="list">
      {dataSource.length ? (
        dataSource.map(({ id, city, country }, index) => (
          <List.Item
            className="list__item"
            key={nanoid()}
            actions={[
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                disabled={loading}
                onClick={searchCallback ? () => searchCallback(id) : null}
                ghost
              />,
              <Button
                type="danger"
                shape="circle"
                disabled={loading}
                icon={<DeleteOutlined />}
                onClick={deleteCallback ? () => deleteCallback(id) : null}
                ghost
              />,
            ]}
          >
            <List.Item.Meta title={`${index + 1}. ${city}, ${country.toUpperCase()}`} />
            <div>{dayjs(id).format('hh:mm:ss A')}</div>
          </List.Item>
        ))
      ) : (
        <Title className="center" level={4}>
          <Text type="secondary">No Record</Text>
        </Title>
      )}
    </div>
  );
}
// Prop types definition
ActionList.defaultProps = {
  loading: false,
  dataSource: [],
  searchCallback: null,
  deleteCallback: null,
};
ActionList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ),
  searchCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
};

export default ActionList;
