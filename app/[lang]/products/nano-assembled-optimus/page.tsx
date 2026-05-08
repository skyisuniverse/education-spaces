import WithDictionary from '../../components/WithDictionary';
import NanoAssembledOptimusClient from './NanoAssembledOptimusClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledOptimusClient dict={dict} />}
    </WithDictionary>
  );
}