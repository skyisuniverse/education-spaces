import WithDictionary from '../../components/WithDictionary';
import XaiClient from './XaiClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <XaiClient dict={dict} />}
    </WithDictionary>
  );
}