import WithDictionary from '../components/WithDictionary';
import ServicesPage from './ServicesPage';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ServicesPage dict={dict} />}
    </WithDictionary>
  );
}