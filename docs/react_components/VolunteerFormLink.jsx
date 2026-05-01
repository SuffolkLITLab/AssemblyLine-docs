import { useLocation } from '@docusaurus/router';
import { Button } from '/docs/react_components/Button.jsx';

export function VolunteerFormLink( props ) {
  /**
   * Send the current url args when the user presses the link to the volunteer
   * form to help us track how people found the program.
   * */

  const { search } = useLocation();
  const urlParams = new URLSearchParams( search );
  const source = props.source || urlParams.get(`source`);

  let sign_up_text = `Sign up to volunteer`
  
  return (
    <p>
      <Button
        href={
          `https://apps.suffolklitlab.org/interview?i=docassemble.DALVolunteerSignup:main.yml&source=${ source || 'docs' }`
        }
        style={{ "--ifm-button-size-multiplier": "1.25" }}
      >
        { sign_up_text }
      </Button>
    </p>
  )

};
