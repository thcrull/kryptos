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
import { useMemo } from "react";
import { STRENGTH_LABELS } from "@renderer/constants/config";

const Analytics = () => {
  const navigate = useNavigate();
  const { data, password } = useVault();

  const vaultData = useMemo(() => data ?? [], [data]);

  // Breach status for each entry
  const breachedStatus = useMemo(
    () => vaultData.map(() => window.context.getBreachStatus(password ?? "")),
    [vaultData]
  );

  // Password strength for each entry
  const strengthScores = useMemo(
    () => vaultData.map((entry) => zxcvbn(entry.password).score),
    [vaultData]
  );

  const weakPasswords = useMemo(
    () => vaultData.filter((_, idx) => strengthScores[idx] < 3),
    [vaultData, strengthScores]
  );

  const passwordCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    vaultData.forEach((entry) => {
      counts[entry.password] = (counts[entry.password] || 0) + 1;
    });
    return counts;
  }, [vaultData]);

  const duplicatePasswords = useMemo(
    () => vaultData.filter((entry) => passwordCounts[entry.password] > 1),
    [vaultData, passwordCounts]
  );

  const breachedPasswords = useMemo(
    () => vaultData.filter((_, idx) => breachedStatus[idx]),
    [vaultData, breachedStatus]
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
            <StatValue>{vaultData.length}</StatValue>
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
                <span>{entry.user}</span>
                <StrengthLabel>
                  {STRENGTH_LABELS[strengthScores[vaultData.indexOf(entry)]]}
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
                <span>{entry.user}</span>
                <StrengthLabel>
                  {STRENGTH_LABELS[strengthScores[vaultData.indexOf(entry)]]}
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
