import WithDictionary from '../../components/WithDictionary';
import NanoAssembledCybercabClient from './NanoAssembledCybercabClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledCybercabClient dict={dict} />}
    </WithDictionary>
  );
}