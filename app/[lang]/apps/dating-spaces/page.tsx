import WithDictionary from '../../components/WithDictionary';
import DatingSpacesClient from './DatingSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <DatingSpacesClient dict={dict} />}
    </WithDictionary>
  );
}