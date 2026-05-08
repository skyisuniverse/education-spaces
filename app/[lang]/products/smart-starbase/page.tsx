import WithDictionary from '../../components/WithDictionary';
import SmartStarbaseClient from './SmartStarbaseClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SmartStarbaseClient dict={dict} />}
    </WithDictionary>
  );
}