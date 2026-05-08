import WithDictionary from '../../components/WithDictionary';
import BusinessSpacesClient from './BusinessSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <BusinessSpacesClient dict={dict} />}
    </WithDictionary>
  );
}