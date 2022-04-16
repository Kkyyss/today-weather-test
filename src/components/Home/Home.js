// react
import { useCallback, useState } from 'react';
// UI, icons
import { Alert, Button, Divider, Form, Input, Typography } from 'antd';
import ActionList from 'components/ActionList';
import Details from 'components/Details';
// apis
import getWeather from 'apis/weatherAPI';
// utils
import { nanoid } from 'nanoid';
import { useMediaQuery } from 'react-responsive';
import { formFields, initialState } from './maps';

const { Title } = Typography;

export default function Home() {
  const [fetchState, setFetchState] = useState(initialState.fetch);
  const [form] = Form.useForm();
  const [searchHistoryState, setSearchHistoryState] = useState(initialState.history);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });

  // Search weather
  const onFinish = useCallback(
    async (values) => {
      try {
        setFetchState({ ...fetchState, loading: true, error: null });
        const result = await getWeather(values);
        const requestDateTime = Date.now();
        setSearchHistoryState([{ id: requestDateTime, ...values }, ...searchHistoryState]);

        setFetchState({
          loading: false,
          result: { ...result, time: requestDateTime },
          error: null,
        });
      } catch (error) {
        setFetchState({ result: null, loading: false, error });
      }
    },
    [fetchState, searchHistoryState]
  );

  // delete search history record
  const deleteSearchHistoryHandler = useCallback(
    (id) => setSearchHistoryState([...searchHistoryState.filter((v) => v.id !== id)]),
    [searchHistoryState]
  );

  // apply search on search history, re-call search function
  const searchHistoryHandler = useCallback(
    async (id) => {
      const [searchHistory] = searchHistoryState.filter((v) => v.id === id);
      const { city, country } = searchHistory;
      await onFinish({ city, country });
    },
    [onFinish, searchHistoryState]
  );

  const clearFormHandler = useCallback(() => {
    form.resetFields();
    setFetchState({ ...fetchState, error: null });
  }, [form, fetchState]);

  const formLayout = isMediumScreen ? 'inline' : 'vertical';

  return (
    <div className="container">
      <Title level={3}>{`Today's Weather`}</Title>
      <Form form={form} onFinish={onFinish} layout={formLayout}>
        {formFields.map(({ label, name, rules }) => (
          <Form.Item key={nanoid()} label={label} name={name} rules={rules}>
            <Input placeholder={label} />
          </Form.Item>
        ))}
        <div className="flex">
          <Button
            block={!isMediumScreen}
            type="primary"
            loading={fetchState.loading}
            onClick={form.submit}
          >
            Search
          </Button>
          <Button
            block={!isMediumScreen}
            type="default"
            disabled={fetchState.loading}
            onClick={clearFormHandler}
          >
            Clear
          </Button>
        </div>
      </Form>

      {fetchState.error && <Alert style={{ margin: 12 }} message={fetchState.error} type="error" />}

      {fetchState.result && <Details result={fetchState.result} />}

      <Title level={3} style={{ marginTop: 12 }}>
        Search History
      </Title>
      <Divider style={{ margin: 12 }} />
      <ActionList
        dataSource={searchHistoryState}
        loading={fetchState.loading}
        searchCallback={searchHistoryHandler}
        deleteCallback={deleteSearchHistoryHandler}
      />
    </div>
  );
}
