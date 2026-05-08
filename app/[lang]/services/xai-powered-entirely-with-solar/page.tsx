import WithDictionary from '../../components/WithDictionary';
import XaiPoweredEntirelyWithSolarClient from './XaiPoweredEntirelyWithSolarClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <XaiPoweredEntirelyWithSolarClient dict={dict} />}
    </WithDictionary>
  );
}