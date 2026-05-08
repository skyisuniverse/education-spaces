import WithDictionary from '../../components/WithDictionary';
import TradeSpacesClient from './TradeSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <TradeSpacesClient dict={dict} />}
    </WithDictionary>
  );
}