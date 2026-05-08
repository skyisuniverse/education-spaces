import WithDictionary from '../../components/WithDictionary';
import OvercomingSerialAttentionLimitationClient from './OvercomingSerialAttentionLimitationClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <OvercomingSerialAttentionLimitationClient dict={dict} />}
    </WithDictionary>
  );
}