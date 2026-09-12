import styled from "styled-components";

import { Member } from "./Member";

import { MembersData } from "types/content";

interface MembersProps {
  contents: {
    members: MembersData;
  };
}

export const Members = ({ contents }: MembersProps) => {
  const { members } = contents;

  return (
    <Root className="container-fluid overflow-hidden py-4 py-md-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
          {members.data.map((member) => {
            return (
              <div key={member.id} className="col px-sm-4 mb-5">
                <Member data={member} />
              </div>
            );
          })}
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div`
  padding-bottom: 4.5rem;
`;
