import WithDictionary from '../../components/WithDictionary';
import TicketSystemClient from './TicketSystemClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <TicketSystemClient dict={dict} />}
    </WithDictionary>
  );
}