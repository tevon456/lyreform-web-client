import React, { useContext } from "react";
import { Content, FormField, UICore } from "../../components";
import "styled-components/macro";
import { SubPage } from "./components";
import { UserContext } from "../../context";
import { Api, Notification } from "../../utils";

export default function Account() {
  const { user, refetch } = useContext(UserContext);

  const updateName = async (e) => {
    try {
      if (user?.name !== e.target.value) {
        await Api.updateUser(user?.uuid, {
          name: e.target.value,
          email: user?.email,
        });
        refetch();
        Notification.info("Account updated.", false);
      }
    } catch (error) {
      Notification.error(
        "We were unable to update your account, please try again in a bit."
      );
    }
  };

  return (
    <SubPage title="Account">
      <Content.Card>
        <UICore.Text size="md" weight="bold">
          Personal
        </UICore.Text>

        <UICore.Flex align="center">
          <Content.Avatar size="large" name={user?.name} />
        </UICore.Flex>
        <UICore.Box style={{ maxWidth: "300px" }}>
          <FormField.Input
            label="Name"
            defaultValue={user?.name}
            mb="12px"
            onBlur={updateName}
          />
          <FormField.Input
            label="Email"
            value={user?.email}
            readOnly
            disabled
          />
        </UICore.Box>
      </Content.Card>
    </SubPage>
  );
}
