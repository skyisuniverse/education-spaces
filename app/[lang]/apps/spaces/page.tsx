import WithDictionary from '../../components/WithDictionary';
import SpacesClient from './SpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SpacesClient dict={dict} />}
    </WithDictionary>
  );
}