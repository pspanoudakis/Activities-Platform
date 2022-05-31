import { Breadcrumb } from 'react-bootstrap'

export default function BreadPath() {
  return (
    <Breadcrumb >
        <Breadcrumb.Item id='path' href="#">Home</Breadcrumb.Item>{/*Where we started*/}
        <Breadcrumb.Item id='path' href="#">Library</Breadcrumb.Item>{/*Middle possitions*/}
        <Breadcrumb.Item id='path' active>Data</Breadcrumb.Item> {/*Where we currently are */}
    </Breadcrumb>
  );
}