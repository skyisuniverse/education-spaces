import WithDictionary from '../../components/WithDictionary';
import ArtSpacesClient from './ArtSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ArtSpacesClient dict={dict} />}
    </WithDictionary>
  );
}