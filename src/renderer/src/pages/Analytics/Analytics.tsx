import { useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  InfoContainer,
  StatCard,
  StatsGrid,
  StatTitle,
  StatValue,
  Highlight,
  StrengthLabel,
  PasswordItem,
  PasswordList,
  Title,
  HighLightsTitle,
} from "./Analytics.styled";
import Button from "@renderer/components/Button/Button";
import { useVault } from "@renderer/context/VaultContext";
import zxcvbn from "zxcvbn";
import { useMemo, useEffect, useState } from "react";
import { STRENGTH_LABELS } from "@renderer/constants/config";

const Analytics = () => {
  const navigate = useNavigate();
  const { data, password } = useVault();

  const [breachStatus, setBreachStatus] = useState<boolean[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchBreachStatus = async () => {
      const result = await window.context.getBreachStatus(password);
      if (result && isMounted) {
        setBreachStatus(result);
      }
    };

    if (password) fetchBreachStatus();

    return () => {
      isMounted = false;
    };
  }, [password]);

  const strengthScores = useMemo(
    () => data.map((entry) => zxcvbn(entry.password).score),
    [data]
  );

  const weakPasswords = useMemo(
    () => data.filter((_, idx) => strengthScores[idx] < 3),
    [data, strengthScores]
  );

  const passwordCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((entry) => {
      counts[entry.password] = (counts[entry.password] || 0) + 1;
    });
    return counts;
  }, [data]);

  const duplicatePasswords = useMemo(
    () => data.filter((entry) => passwordCounts[entry.password] > 1),
    [data, passwordCounts]
  );

  const breachedPasswords = useMemo(
    () => data.filter((_, idx) => breachStatus[idx]),
    [data, breachStatus]
  );

  return (
    <Container>
      <Header>
        <Button onClick={() => navigate("/vault")}>Back</Button>
      </Header>

      <InfoContainer>
        <StatsGrid>
          <StatCard>
            <StatTitle>Total Entries</StatTitle>
            <StatValue>{data.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Weak Passwords</StatTitle>
            <StatValue>{weakPasswords.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Duplicate Passwords</StatTitle>
            <StatValue>{duplicatePasswords.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Breached Passwords</StatTitle>
            <StatValue>{breachedPasswords.length}</StatValue>
          </StatCard>
        </StatsGrid>

        <InfoContainer>
          <HighLightsTitle>Highlights</HighLightsTitle>
          {weakPasswords.length > 0 && (
            <Highlight>
              Weak passwords detected. Consider updating them.
            </Highlight>
          )}
          {duplicatePasswords.length > 0 && (
            <Highlight>
              Duplicate passwords found. Avoid reusing passwords.
            </Highlight>
          )}
          {breachedPasswords.length > 0 && (
            <Highlight>
              Some passwords were breached. Change them immediately.
            </Highlight>
          )}
        </InfoContainer>

        {weakPasswords.length > 0 && (
          <PasswordList>
            <Title>Weak Passwords</Title>
            {weakPasswords.map((entry, idx) => (
              <PasswordItem key={idx} weak>
                <span>{entry.password}</span>
                <StrengthLabel>
                  {STRENGTH_LABELS[strengthScores[data.indexOf(entry)]]}
                </StrengthLabel>
              </PasswordItem>
            ))}
          </PasswordList>
        )}

        {breachedPasswords.length > 0 && (
          <PasswordList>
            <Title>Breached Passwords</Title>
            {breachedPasswords.map((entry, idx) => (
              <PasswordItem key={idx} breached>
                <span>{entry.password}</span>
                <StrengthLabel>
                  {STRENGTH_LABELS[strengthScores[data.indexOf(entry)]]}
                </StrengthLabel>
              </PasswordItem>
            ))}
          </PasswordList>
        )}
      </InfoContainer>
    </Container>
  );
};

export default Analytics;
