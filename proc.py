from datetime import datetime
import os

with open('README.tmp', 'w') as output:
    no = 1
    for line in open('README.md'):
        if 'X. Liu' in line or  'Liu, X.' in line:
            record = '{}. {}'.format(no, line[line.index('['):])
            no += 1
            output.write(record)
        elif '_Last updated' in line:
            today = datetime.now
            output.write('_Last updated {}'.format(datetime.now().strftime("%Y-%m-%d")))
        else:
            output.write(line)

os.replace('README.tmp', 'README.md')
os.system('git add -A .')
os.system("git commit -m'updated'")
os.system("git push")
