import WithDictionary from '../../components/WithDictionary';
import DeliverySpacesClient from './DeliverySpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <DeliverySpacesClient dict={dict} />}
    </WithDictionary>
  );
}