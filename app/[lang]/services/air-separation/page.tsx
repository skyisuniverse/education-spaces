import WithDictionary from '../../components/WithDictionary';
import AirSeparationClient from './AirSeparationClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <AirSeparationClient dict={dict} />}
    </WithDictionary>
  );
}