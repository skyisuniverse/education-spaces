import WithDictionary from '../../components/WithDictionary';
import SpacexClient from './SpacexClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SpacexClient dict={dict} />}
    </WithDictionary>
  );
}