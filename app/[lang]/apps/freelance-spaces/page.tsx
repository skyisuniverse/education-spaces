import WithDictionary from '../../components/WithDictionary';
import FreelanceSpacesClient from './FreelanceSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <FreelanceSpacesClient dict={dict} />}
    </WithDictionary>
  );
}