import WithDictionary from '../components/WithDictionary';
import ApplicationsPage from './ApplicationsPage';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ApplicationsPage dict={dict} />}
    </WithDictionary>
  );
}