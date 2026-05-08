import WithDictionary from '../components/WithDictionary';
import CompaniesPage from './CompaniesPage';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <CompaniesPage dict={dict} />}
    </WithDictionary>
  );
}